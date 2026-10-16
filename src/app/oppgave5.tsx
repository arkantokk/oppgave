import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native';

const WEATHER_BACKGROUNDS = {
  clear: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1080',
  cloudy: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1080',
  rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1080',
  snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=1080',
  thunder: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=1080',
  fog: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1080',
};

const WMO_CODES: Record<number, string> = {
  0: 'Klarvær',
  1: 'Stort sett klart',
  2: 'Delvis skyet',
  3: 'Overskyet',
  45: 'Tåke',
  48: 'Rimfrosttåke',
  51: 'Lett yr',
  53: 'Moderat yr',
  55: 'Tett yr',
  56: 'Lett underkjølt yr',
  57: 'Tett underkjølt yr',
  61: 'Lett regn',
  63: 'Moderat regn',
  65: 'Kraftig regn',
  66: 'Lett underkjølt regn',
  67: 'Kraftig underkjølt regn',
  71: 'Lett snøfall',
  73: 'Moderat snøfall',
  75: 'Kraftig snøfall',
  77: 'Snøkorn',
  80: 'Lette regnbyger',
  81: 'Moderate regnbyger',
  82: 'Kraftige regnbyger',
  85: 'Lette snøbyger',
  86: 'Kraftige snøbyger',
  95: 'Tordenvær',
  96: 'Tordenvær med lett hagl',
  97: 'Kraftig tordenvær',
  99: 'Kraftig tordenvær med hagl',
};

const getBackgroundByCode = (code: number): string => {
  if (code === 0 || code === 1) return WEATHER_BACKGROUNDS.clear;
  if (code === 2 || code === 3) return WEATHER_BACKGROUNDS.cloudy;
  if (code === 45 || code === 48) return WEATHER_BACKGROUNDS.fog;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return WEATHER_BACKGROUNDS.rain;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return WEATHER_BACKGROUNDS.snow;
  if (code >= 95 && code <= 99) return WEATHER_BACKGROUNDS.thunder;
  return WEATHER_BACKGROUNDS.clear;
};

export default function App() {
  const [city, setCity] = useState('Shanghai');
  const [weather, setWeather] = useState('Lette regnbyger');
  const [temperature, setTemperature] = useState('13°');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentBg, setCurrentBg] = useState(WEATHER_BACKGROUNDS.rain);
  const [nextBg, setNextBg] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const changeBackgroundWithFade = (newImageUrl: string) => {
    if (newImageUrl === currentBg) return;
    setNextBg(newImageUrl);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      setCurrentBg(newImageUrl);
      setNextBg(null);
      fadeAnim.setValue(0);
    });
  };

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;

    setLoading(true);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=no&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
      );
      const weatherData = await weatherRes.json();

      const current = weatherData.current;
      if (current) {
        setCity(name);
        setTemperature(`${Math.round(current.temperature_2m)}°`);
        setWeather(WMO_CODES[current.weather_code] || 'Ukjent');
        setSearchQuery('');

        const newBg = getBackgroundByCode(current.weather_code);
        changeBackgroundWithFade(newBg);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Image source={{ uri: currentBg }} style={StyleSheet.absoluteFill} resizeMode="cover" />

      {nextBg && (
        <Animated.Image
          source={{ uri: nextBg }}
          style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}
          resizeMode="cover"
        />
      )}

      <View style={styles.overlay}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.innerContainer}
          >
            <View style={styles.weatherContainer}>
              <Text style={styles.cityText}>{city}</Text>
              <Text style={styles.conditionText}>{weather}</Text>
              <Text style={styles.tempText}>{temperature}</Text>
              {loading && <ActivityIndicator color="#ffffff" style={styles.loader} />}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Søk etter et sted"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCorrect={false}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 50,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  weatherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 44,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  conditionText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 6,
    marginBottom: 4,
    fontWeight: '400',
  },
  tempText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#ffffff',
  },
  loader: {
    marginTop: 15,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});