# text-to-jlpt

## Description

This is just a lame attempt at fiddling around with non-latin texts. More precisely: Processing japanese texts and display the occuring JLPT(N5 only, atm) characters + Translation.

![Image](https://image.ibb.co/jOstgF/Screen_Shot_2017_02_09_at_15_42_47.png)

## Requirements
* mongodb
* node.js

## Installation
* Clone repository
* Import the JLPT N5 Kanji `n5.json`:
 * Navigate to the project root and run: `mongoimport --db mydb --collection n5 --file n5.json`
* `npm install`
* `nodemon app`, because I love nodemon
* Open `localhost:3000` in your favorite browser.



## Credits
[jisho.org](http://jisho.org/) and  [JMdict](http://www.edrdg.org/jmdict/edict_doc.html) for the translations and information about the JLTP Levels

## License

This software uses the JMdict dictionary files. These files are the property of the Electronic Dictionary Research and Development Group, and are used in conformance with the Group's [license](http://www.edrdg.org/edrdg/licence.html), thus this project also licenced under the Creative Commons Attribution-ShareAlike [Licence](https://creativecommons.org/licenses/by-sa/3.0/)