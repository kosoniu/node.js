
vFrame assets workflow (with Grunt)
===================================

Łukasz Podolski, 2015-03-03

Dotyczy: styli, skryptów, statycznych grafik, webfont-ów.


Backend
-------

Zend Framework: Zend_View + Zend_Layout (2-step).

Akcja ma dostęp do obiektu View i standardowo powinna zapisać w nim swój wynikowy kod HTML, oraz - poprzez view-helpery - dodatkowe dane dla szablonu. Może też wybrać szablon inny niż domyślny.

Standardowe view-helpery: [TODO: wybrać, sprawdzić nasze, opisać]

  * Action View
  * BaseUrl
  * Currency
  * Cycle
  * Partial [**]
  * Placeholder [**]
  * Doctype
  * Gravatar View
  * HeadLink [***]
  * HeadMeta
  * HeadScript [**]
  * HeadStyle [*]
  * HeadTitle
  * HTML Objects
  * InlineScript [***]
  * RenderToPlaceholder [*]
  * JSON
  * Navigations
      * Breadcrumbs [***]
      * Links [**]
      * Menu [***]
      * Sitemap [**]
      * Navigation
  * Translate
  * UserAgent View

W szablonie dane z obiektu View zamieniane są na pełny wynikowy HTML, wraz z kodem i odwołaniami do styli i skryptów. Domyślny szablon to `default.phtml`.

Domyślnie w środowisku produkcyjnym powinny być używane: po jednym pliku `.js`, `.css` i `.png` (sprite-y). Możliwe jest jednak, by moduły, kontrolery lub akcje dodawały właściwe sobie, inne pliki - zwłaszcza gdyby finalny pojedynczy plik miałby być bardzo duży. Obowiązkowo nazwy plików powinne po każdym wdrożeniu/buildzie/deploy-u zmieniane, by uniknąć problemów z cache przeglądarek.


Dodatkowe akcje:

-grunt minimg lub grunt tinypng - kompresuje obrazki z folderu "public-grunt/img" do "public/img"
-grunt htmlmin - kompresuje pliki html z folderu "public-grunt/img" do "public/img"
