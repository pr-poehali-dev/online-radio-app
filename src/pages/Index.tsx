import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface RadioStation {
  id: number;
  name: string;
  genre: string;
  frequency: string;
  streamUrl: string;
  currentSong: string;
  artist: string;
  coverUrl: string;
}

const radioStations: RadioStation[] = [
  {
    id: 1,
    name: 'Radio Grace',
    genre: 'Христианская музыка',
    frequency: 'Online',
    streamUrl: 'https://radio-grace.site/listen/radio_grace/radio.mp3',
    currentSong: 'Слушайте Radio Grace',
    artist: 'Прямой эфир',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  }
];

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<RadioStation>(radioStations[0]);
  const [volume, setVolume] = useState([70]);
  const [history, setHistory] = useState<RadioStation[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const selectStation = (station: RadioStation) => {
    setCurrentStation(station);
    if (!history.find(s => s.id === station.id)) {
      setHistory([station, ...history].slice(0, 5));
    }
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 100);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, []);

  return (
    <div className="min-h-screen radio-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Моё Радио
          </h1>
          <p className="text-muted-foreground text-lg">Слушайте любимую музыку онлайн</p>
        </header>

        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="glass-effect p-8 border-2 border-primary/20 animate-scale-in">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-64 md:h-64 w-full h-64 rounded-2xl overflow-hidden shadow-2xl relative group">
                <img 
                  src={currentStation.coverUrl} 
                  alt={currentStation.currentSong}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {isPlaying && (
                  <div className="absolute bottom-4 left-4 right-4 flex gap-1 justify-center items-end h-8">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-primary rounded-full wave-animation"
                        style={{ 
                          height: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{currentStation.genre} · {currentStation.frequency}</p>
                    <h2 className="text-3xl font-bold mb-2">{currentStation.name}</h2>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xl font-semibold text-primary">{currentStation.currentSong}</p>
                    <p className="text-lg text-muted-foreground">{currentStation.artist}</p>
                  </div>
                </div>

                <div className="space-y-6 mt-8">
                  <div className="flex items-center justify-center gap-6">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-primary/20"
                    >
                      <Icon name="SkipBack" size={24} />
                    </Button>
                    
                    <Button 
                      size="icon"
                      onClick={togglePlay}
                      className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/50 transition-all hover:scale-105"
                    >
                      {isPlaying ? (
                        <Icon name="Pause" size={32} />
                      ) : (
                        <Icon name="Play" size={32} className="ml-1" />
                      )}
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-primary/20"
                    >
                      <Icon name="SkipForward" size={24} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Icon name="Volume2" className="text-muted-foreground" size={20} />
                    <Slider 
                      value={volume}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-12 text-right">{volume[0]}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {history.length > 0 && (
            <Card className="glass-effect p-6 border border-primary/10 animate-slide-up">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Clock" size={20} />
                История прослушивания
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((station) => (
                  <button
                    key={station.id}
                    onClick={() => selectStation(station)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all group"
                  >
                    <img 
                      src={station.coverUrl} 
                      alt={station.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="text-left flex-1">
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">{station.name}</p>
                      <p className="text-xs text-muted-foreground">{station.genre}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      <audio ref={audioRef} src={currentStation.streamUrl} />
    </div>
  );
};

export default Index;