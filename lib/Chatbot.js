import react, {useState} from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from "react-native"
import axios from "axios"
import { speak, isSpeakingAsync, stop } from "expo-speech"

const Chatbot = ()=>{
    const [chat, setChat] = useState([])
    const [userInput, setUserInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isSpeaking, setIsSpeaking] = useState(false)

    const API_KEY = "AIzaSyCvsOdYZNEcgtsbQ8SOiMfzVZoHA5uBtAo"

    const handleUserInput = async ()=>{
        // Add user input to chat
        let updatedChat = [
            ...chat,
            {
                role:"user",
                parts: [{text: userInput}],
            }
        ]
    }
}