import { Stack } from "expo-router";

export default function RoutLayout (){
    return(
        <Stack>
            <Stack.Screen  name="index" options={{
                headerTitle:"Users",
            }}/>
            <Stack.Screen name="todos/[id]" 
            options={{
                headerTitle:"Details Page",
            }} />
           
        </Stack>
    )
}