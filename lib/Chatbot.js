import react, {useEffect, useState} from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native"
import axios from "axios"
import { speak, isSpeakingAsync, stop } from "expo-speech"
import ChatBubble from "@/components/chatbot/ChatBubble"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';


const instructions = "You are a medical virtual assistant working for SugaFree. Your name is Jane. Respond to all messages as if you are a medical virtual assistant named Jane working for SugaFree.";

const Chatbot = ()=>{
    const [chat, setChat] = useState([])
    const [userInput, setUserInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isSpeaking, setIsSpeaking] = useState(false)

    const API_KEY = "AIzaSyCEdrk76g0fLNK90tn-y_gUerWK-ze4mz0"

    useEffect(()=>{
        const chatbotIntroduction = {
            role:"model",
            parts:[{ text: "Hello! I'm Jane, your virtual assistant. How can I assist you?"}]
        }

        setChat([chatbotIntroduction])
    },[])
    

    const handleUserInput = async ()=>{

        // Add user input to chat
        let updatedChat = [
            ...chat,
            {
                role:"user",
                parts: [{text: `${instructions}${userInput}` }],
            }
        ]
        setLoading(true)
        try{
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
                {
                    contents:updatedChat,
                }
            );
            console.log("Gemini API response:", response.data)
            const modelResponse = 
                response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if(modelResponse){
                // Add model response
                const updatedChatWithModel = [
                    ...updatedChat,
                    {
                        role:"model",
                        parts: [{ text: modelResponse}]
                    }
                ]
                setChat(updatedChatWithModel)
                setUserInput("")
            }
        } catch(error){
            console.error("Error calling Gemini API:", error)
            console.error("Error response:",error.response)
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleSpeech = async (text)=>{
        if (isSpeaking){
            // If already speaking, stop the speech
            stop()
            setIsSpeaking(false)
        } else{
            // If not speaking, start the speech
            if (!(await isSpeakingAsync())){
                speak(text)
                setIsSpeaking(true)
            }
        }
    }
    
    const renderChatItem = ({item})=>(
        <ChatBubble
            role={item.role}
            text={item.parts[0].text}
            onSpeech={()=> handleSpeech(item.parts[0].text)}
        />
    )
    
    return (
        <SafeAreaView className='bg-white relative'>
            <View className="flex-row items-center justify-between px-3 bg-white border-b-2 border-primary z-10 absolute top-7 left-0 right-0">
            <TouchableOpacity
                        activeOpacity={0.7}
                        className=""
                        onPress={()=>{
                          router.push("/(tabs)/home");
                      }}
                      >
                        <Ionicons name="chevron-back" size={50} color="#41D2F2" />
            </TouchableOpacity>
            <Text 
            className="font-bold text-center text-xl py-6"
            >SugaFree Chatbot</Text>
            <View>
                <Ionicons name="chevron-back" size={50} color="white" />
            </View>
            </View>

        <View 
        // style={styles.container}
        className="flex h-[100%] p-4 bg-white pt-24"
        >
            <FlatList
                data={chat}
                renderItem={renderChatItem}
                keyExtractor={(item,index)=> index.toString()}
                contentContainerStyle={styles.chatContainer}
            />
            <View 
            style={styles.inputContainer}
            >
                <TextInput
                    // style={styles.input}
                    className="flex-1 h-[60px] border border-textSecondary/40 rounded-xl p-4 mr-2 focus:border focus:border-primary"
                    placeholder="Type your message..."
                    placeholderTextColor={"#aaa"}
                    value={userInput}
                    onChangeText={setUserInput}
                />
    
                <TouchableOpacity 
                className="bg-primary rounded-xl p-4"
                // style={styles.button} 
                onPress={handleUserInput}>
                    <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator className="mt-5" color={"#333"}/>}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        backgroundColor:"#f8f8f8"
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        color:"#333",
        marginBottom: 20,
        marginTop: 40,
        textAlign: "center"
    },
    chatContainer:{
        flexGrow:1,
        justifyContent:"flex-end"
    },
    inputContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:10
    },
    input:{
        flex:1,
        height:50,
        marginRight:10,
        padding:8,
        borderColor:"#333",
        borderWidth:1,
        borderRadius:25,
        color:"#333",
        backgroundColor:"#fff"
    },
    button:{
        padding:10,
        backgroundColor:"#000000",
        borderRadius:25,
    },
    buttonText:{
        color:"#fff",
        textAlign:"center"
    },
    loading:{
        marginTop:10
    },
    error:{
        color:"red",
        marginTop:10
    }
})

export default Chatbot

