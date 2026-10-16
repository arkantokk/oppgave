import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Image, View } from 'react-native'

export default function BilderPage() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800',
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Image
                    source={require('@/assets/images/icon.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    image: {
        width: 320,
        height: 220,
    },
});