(ns auteur.core)

(defprotocol IViewNode
  (get-el [this])
  (get-children [this]))

(defprotocol IRenderable
  (-init [this state])
  (-update [this old-state new-state])
  (-destroy [this]))

(extend-type js/HTMLDivElement
  IRenderable
  (-init [this content] (-update this nil content))
  (-update [this _ content]
    (cond
     (string? content)
     (set! (.-innerHTML this) content)

     (not (nil? (.-nodeType content)))
     (set! (.-innerHTML this)
           (.-outerHTML content))))
  (-destroy [this] (.removeElement js/document this))

  IViewNode
  (get-el [this] this)
  (get-children [this] []))

(extend-type js/Text
  IRenderable
  (-init [this content] (-update this nil content))
  (-update [this _ content] (set! (.-textContent this) content))
  (-destroy [this] (.removeElement (.-parentNode this) this))

  IViewNode
  (get-el [this] this)
  (get-children [this] []))

(extend-type js/Attr
  IRenderable
  (-init [this value] (-update this nil value))
  (-update [this _ value]
    (set! (.-value this) value))
  (-destroy [this]
    nil
    ;; or
    ;; (set! (.-value this) js/null)
    ))

;; (extend-type js/HTMLSelectElement
;;   IRenderable
;;   (-init [this inner-html] (.documentFragment js/document inner-html))
;;   (-update [this _ {:keys [options selected]}]
;;     (set! (.-innerHTML this)
;;           inner-html))
;;   (-destroy [this] (.removeElement js/document this))
;;   (get-el [this] this)
;;   (get-children [this] []))

(defprotocol IViewManager
  (bind [this view-id view state-atom])
  (-mark-dirty [this state-atom old-state new-state])
  (-update-views [this]))


;;; view-mapping is
;;; {:by-id {:namespace/view-id {:view ... :state-atom ...}}
;;;  :by-atom {}}
;;; dirty-tracker-atom is [[old-state new-state]]
;;; render-timer-atom is a JavaScript timer object or nil
(defrecord ViewManager [view-mapping-atom dirty-tracker-atom render-timer-atom]
  IViewManager
  (bind [this view-id view state-atom]
    (swap! view-mapping-atom
           (fn [view-mappings]
             (-> view-mappings
                 (update-in [:by-id]
                            assoc view-id
                            {:view view :state-atom state-atom})
                 (update-in [:by-atom] assoc state-atom view-id))))
    (add-watch state-atom
               ::view-manager
               (fn [_ state-atom old-state new-state]
                 (-mark-dirty this state-atom old-state new-state))))

  (-mark-dirty [this state-atom old-state new-state]
    (when (not= old-state new-state)
      (swap! dirty-tracker-atom update-in [state-atom]
             (fn [previous-dirty]
               (if previous-dirty
                 (list (first previous-dirty) new-state)
                 (list old-state new-state))))
      (swap! render-timer-atom
             (fn view-manager-update-on-next-tick [old-timer]
               (when old-timer
                 (js/clearTimeout old-timer)))
             (js/setTimeout #(-update-views this) 0))))

  (-update-views [this]
    (doseq [[state-atom [old-state new-state]] @dirty-tracker-atom
            :let [view-id (get-in @view-mapping-atom [:by-atom state-atom])
                  dirty-view (get-in @view-mapping-atom
                                     [:by-id view-id :view])]]
      (-update dirty-view old-state new-state))
    (reset! dirty-tracker-atom {})))

(defn mk-view-manager []
  (ViewManager.
   (atom {:by-id {} :by-atom {}})
   (atom {})
   (atom nil)))
