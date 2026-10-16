import { View, Button, Text } from 'react-native'
import { useState } from 'react'
export default function Buttons() {
    const [num, changeNum] = useState(0)
    
    return (
        <View>
            <Text>
                {num}
            </Text>
            <Button
                title='Øk teller'
                onPress={() => changeNum (num + 1)}
            />
            <Button
                title='Reduser teller'
                onPress={() => changeNum((num - 1) > 0 ? (num - 1) : 0)}
            />
        </View>
    )
}