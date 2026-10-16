import * as Device from 'expo-device';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>En app</Text>
        </View>

        <View style={styles.squaresContainer}>
          <View style={styles.topRow}>
            <View style={[styles.box, styles.greenBox]} />
            <View style={[styles.box, styles.blackBox]} />
          </View>
          <View style={[styles.box, styles.yellowBox]} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.centerText}>
            Tekst som er uten{'\n'}mening!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ff3b3b',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ff3b3b',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  squaresContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 60,
    height: 60,
  },
  greenBox: {
    backgroundColor: '#4ade00',
  },
  blackBox: {
    backgroundColor: '#1a1a1a',
  },
  yellowBox: {
    backgroundColor: '#f5e942',
    marginTop: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    lineHeight: 28,
  },
  buttonContainer: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});