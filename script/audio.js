function gantiAudio(music){
  document.getElementById("my-audio").pause();
  document.getElementById("my-audio").setAttribute('src', music);
  document.getElementById("my-audio").load();
  document.getElementById("my-audio").play();
}