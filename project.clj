(defproject auteur "0.1.0-SNAPSHOT"
  :description "Clojurescript library for managing dom view updates"
  :url "https://github.com/BirdseyeSoftware/auteur"
  :license {:name "MIT"
            :url "http://opensource.org/licenses/MIT"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-1859"]
                 [org.clojure/google-closure-library
                  "0.0-20130212-95c19e7f0f5f"]]
  :source-paths ["src/auteur" "src/auteur_sample"]
  :plugins [[lein-cljsbuild "0.3.3"]]
  :cljsbuild
  {:builds
   [{:id "dev"
     :source-paths ["src/auteur" "src/auteur_sample"]
     :compiler
     {:output-to "resources/public/js/auteur_dev.js"
      :target :browser
      :output-wrapper true
      :optimizations :whitespace
      :pretty-print true
      :externs ["resources/externs/rx.modern.js"]}}
    {:id "production"
     :source-paths ["src/auteur"]
     :compiler
     {:output-to "resources/public/js/auteur.js"
      :target :browser
      :output-wrapper true
      :optimizations :advanced
      :pretty-print false
      :externs ["resources/externs/rx.modern.js"]}}]})
