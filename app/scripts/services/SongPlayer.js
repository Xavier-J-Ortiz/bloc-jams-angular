(function() {
     function SongPlayer() {
         var SongPlayer = {};
         
         var currentSong = null;
         var currentBuzzObject = null;
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         
         var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 currentSong.playing = null;
             }
             
             /**
             * @desc Buzz object audio file
             * @type {Object}
             */
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
             
             currentSong = song;
         };
         
         /**
         * @function SongPlayer.playsong
         * @desc plays currentBuzzObject, sets song.playing to true
         * @param {Object} song
         */
         
         SongPlayer.playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;
         }
         
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
                 setSong(song);
                 SongPlayer.playSong(song);
             } 
             else if (currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     SongPlayer.playSong(song);
                 }
             }
         };
         
         SongPlayer.pause = function(song) {
             currentBuzzObject.pause();
             song.playing = false;
         };
         
         return SongPlayer;
     }
    
    angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();