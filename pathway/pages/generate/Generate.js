import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import PurpleButton from "../../components/PurpleButton";
import WhiteButton from "../../components/WhiteButton";
import GradientCard from "../../components/GradientCard";
import { useEffect, useState } from 'react';
import CONFIG from "../../config/config";


// Image assets for social media logos
const facebooklogo = require("../../assets/facebooklogo.png");
const instagramlogo = require("../../assets/instagramlogo.png");
const tiktoklogo = require("../../assets/tiktoklogo.png");
const twitterlogo = require("../../assets/twittersymbol.png");

export default function Generate({ navigation }) {
  // State for the fetched logos
  const [logos, setLogos] = useState([]);
  
  // State to store the generated website content
  const [websiteContent, setWebsiteContent] = useState(null);
  
  // State to check if the website is currently being generated
  const [isGenerating, setIsGenerating] = useState(false);
  
  // State to check if the website has been successfully generated
  const [websiteGenerated, setWebsiteGenerated] = useState(false);

  const [isLoadingLogos, setIsLoadingLogos] = useState(false);

  // Fetches logo data from the server
  const fetchLogos = async () => {
    try {
      setIsLoadingLogos(true);
      const result = await fetch(`${CONFIG.SERVER_URL}/logo?color=red&theme=vintage`);
      const jsoned = await result.json();
      setLogos(jsoned);
      setIsLoadingLogos(false);
    } catch (error) {
      console.error("Error fetching logos:", error);
      setIsLoadingLogos(false);
    }
  }

  // UseEffect hook to fetch logos once when the component is mounted
  useEffect(() => {
    fetchLogos();
  }, []);

  // Generates website content from the server
  const generateWebsite = async () => {
    try {
      setIsGenerating(true);
      const response = await await fetch(`${CONFIG.SERVER_URL}/website?name=PhoExpress&product=Chicken&location=Seattle&details=comfortable`);
      const data = await response.text();
      setWebsiteContent(data);
      setIsGenerating(false);
      setWebsiteGenerated(true);
    } catch (error) {
      console.error("Error generating website:", error);
      setIsGenerating(false);
    }
  }

  // Opens a new window/tab with the generated website content
  const openGeneratedWebsite = () => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(websiteContent);
  }

  return (
    <ScrollView>
      {/* Gradient Card for Social Media logos */}
      <GradientCard text="Social Media">
        <View style={styles.logoContainer}>
          {/* Navigating to different screens upon clicking on each logo */}
          <TouchableOpacity onPress={() => navigation.navigate("SocialMedia")}>
            <Image source={facebooklogo} style={{height: 84, width: 84, marginTop: -6}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SocialMedia")}> 
            <Image source={instagramlogo} style={{height: 70, width: 70}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SocialMedia")}> 
            <Image source={tiktoklogo} style={{height: 70, width: 70}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SocialMedia")}>  
            <Image source={twitterlogo} style={{height: 70, width: 70}} />
          </TouchableOpacity>
        </View>
      </GradientCard>

      {/* Gradient Card for Website Generation */}
      <GradientCard text="Website">
        <View>
          {!websiteGenerated ? (
            <>
              {isGenerating ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="white" />
                  <Text style={styles.loadingText}>Generating website. Please wait...</Text>
                </View>
            ) : (
              <PurpleButton text="Generate Website" onPress={generateWebsite}></PurpleButton>
              )}
            </>
          ) : (
            <>
              <WhiteButton text="Visit Website" onPress={openGeneratedWebsite}></WhiteButton>
              <WhiteButton text="Manage Website" onPress={openGeneratedWebsite}></WhiteButton>
            </>
          )}
        </View>     
      </GradientCard>

      {/* Gradient Card for displaying Logo Ideas */}
      <GradientCard text="Logo Ideas">
      <View>
        {/* Displaying two rows of logos */}
      <View style={styles.row}>
        <Image source={{uri: logos[0]}} style={styles.image} />
        <Image source={{uri: logos[1]}} style={styles.image} />
      </View>
      <View style={styles.row}>
        <Image source={{uri: logos[2]}} style={styles.image} />
        <Image source={{uri: logos[3]}} style={styles.image} />
      </View>
      {/* Button to re-fetch and regenerate logos */}
      {isLoadingLogos ? (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Generating...</Text>
      </View>
      ) : (
        <PurpleButton text="Regenerate" onPress={fetchLogos}></PurpleButton>
      )}
    </View>
      </GradientCard>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,  // Increased size from 40 to 80
    height: 80, // Increased size from 40 to 80
    resizeMode: 'contain',
    marginVertical: 15, // Spaced them out vertically
    marginHorizontal: 15
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-around",  // Used space-around for even spacing
    marginBottom: 10,  // Spaced out each row vertically
  },
  loadingContainer: {
    width: "96%",
    height: 60,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 7,
    flexDirection: 'row',
    padding: 10,
    backgroundColor:["#af02cb"] // assuming the purple color is the color of your PurpleButton
  },
  loadingText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Jost",
    fontWeight: "bold",
  }
});


