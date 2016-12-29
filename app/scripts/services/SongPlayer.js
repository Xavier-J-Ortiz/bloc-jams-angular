(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};        
        var currentAlbum = Fixtures.getAlbum();
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        SongPlayer.currentSong = null;
        var currentBuzzObject = null;
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         
         var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }
             
             /**
             * @desc Buzz object audio file
             * @type {Object}
             */
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
             
             SongPlayer.currentSong = song;
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
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 SongPlayer.playSong(song);
             } 
             else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     SongPlayer.playSong(song);
                 }
             }
         };
         
         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }            
        };
        
        SongPlayer.next = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex++;
            if (currentSongIndex > (currentAlbum.length - 1)) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        return SongPlayer;
    }
    
    angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();