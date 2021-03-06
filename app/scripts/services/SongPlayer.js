(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};        
        var currentAlbum = Fixtures.getAlbum();
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        SongPlayer.currentSong = null;
        SongPlayer.volume = null;
        
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;
        var currentBuzzObject = null;
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */        
         var setSong = function(song) {
             if (currentBuzzObject) {
                 stopSong(SongPlayer.currentSong)
             }
             
             /**
             * @desc Buzz object audio file
             * @type {Object}
             */
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
             
             currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                     SongPlayer.volume = currentBuzzObject.getVolume();
                 });
             });
             
             SongPlayer.currentSong = song;
         };
        
        var stopSong = function(song) {            
            currentBuzzObject.stop();
            song.playing = null;
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
                stopSong(SongPlayer.currentSong);
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
                stopSong(SongPlayer.currentSong);                
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.setVolume = function (volume) {
            
            currentBuzzObject.setVolume(volume);
            
        }
        
        return SongPlayer;
    }
    
    angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();