import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function PasswordPage() {
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Passord</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Skriv inn passordet ditt:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          <Text style={styles.resultText}>
            Passordet ditt er: {password}
          </Text>

          {password.length < 5 && (
            <Text style={styles.warningText}>
              Passordet må minst ha 5 tegn
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#373F51',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#373F51',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1.5,
    borderColor: '#7a7a7a',
    borderRadius: 2,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 40,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 100,
  },
  warningText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});