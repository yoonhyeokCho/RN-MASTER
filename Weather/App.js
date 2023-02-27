import * as React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CITY = ["Seoul", "Tokyo", "Beijing", "Shanghai"]

export default function App() {
  const [isReady, setReady] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [region, setRegion] = React.useState("Seoul")

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${process.env.REACT_APP_API_KEY}`);
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (err) {
        console.log(err);
      }
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [region]);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={{
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: item == region ? "#FF8000" : "#BEC0D1",
          marginHorizontal: 10,
          width: 100,
          height: 40,
        }}
        onPress={() => setRegion(item)}
      >
        <Text style={{ color: "#FFFFFF" }}>{item}</Text>
      </Pressable>
    );
  };

  const renderItem2 = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FF8000",
          marginTop: hp(2),
          marginHorizontal: wp(4),
          width: wp(30),
          height: wp(30),
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: hp(2), marginBottom: 10, fontWeight: "bold" }}>{item.key}</Text>
        <Text style={{ color: "#FFFFFF", fontSize: hp(2) }}>{item.value}</Text>
      </View>
    );
  };

  if (isReady) {
    return (
      <View style={styles.container2}>
        <View>
          <FlatList showsHorizontalScrollIndicator={false} horizontal data={CITY} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>

        <View style={{ marginTop: hp(5), alignSelf: "center", width: wp(70), height: hp(40), backgroundColor: "#FF8000", borderRadius: 20 }}>
          <Image
            style={{ width: wp(60), height: wp(60), alignSelf: "center" }}
            source={{
              uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={{color:"#FFFFFF", textAlign: "center", fontSize: hp(5), fontWeight: "bold" }}>{data.weather[0].description}</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <FlatList
            numColumns={2}
            data={[
              { key: "최저 기온", value: parseInt(data.main.temp_min - 273.15) + " 도" },
              { key: "최고 기온", value: parseInt(data.main.temp_max - 273.15) + " 도" },
              { key: "풍속", value: data.wind.speed + " m/s" },
              { key: "습도", value: data.main.humidity + " %" },
            ]}
            renderItem={renderItem2}
            keyExtractor={(item, index) => index.toString()}

          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Image style={{ marginTop: hp(20), width: wp(70), height: wp(70), alignSelf: "center" }} source={require("./assets/weatherImg.png")} />

      <Text style={{ marginTop: hp(5), width: wp(70), textAlign: "center", alignSelf: "center", fontSize: hp(3) }}>
        <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>오늘의 날씨</Text>
      </Text>

      <Text style={{ color: "#000000", marginTop: hp(2), width: wp(70), textAlign: "center", alignSelf: "center", fontSize: hp(2) }}>
        최저 온도, 최고 온도, 풍속, 습도 등의 날씨 정보가 있습니다.
      </Text>

      <Pressable
        style={{
          width: wp(50),
          height: hp(6),
          marginTop: hp(10),
          backgroundColor: "#BBACF2",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
        onPress={() => setReady(true)}
      >
        <Text style={{ fontSize: hp(2), color: "#FFFFFF", fontWeight: "bold" }}>보러 가기</Text>

      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#81F781",
  },
  container2: {
    flex: 1,
    backgroundColor: "#81F781",
    paddingTop: hp(10),
  },
});
