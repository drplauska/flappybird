import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";

export default function App() {
  const [running, setRunning] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const gameEngineRef = useRef<GameEngine>(null);

  useEffect(() => {
    setRunning(false);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          margin: 20,
        }}
      >
        {currentPoints}
      </Text>
      <GameEngine
        ref={gameEngineRef}
        systems={[Physics]}
        running={running}
        entities={entities()}
        onEvent={(e: { type: string }) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              if (gameEngineRef.current) {
                gameEngineRef.current.stop();
              }
              break;
            case "new_point":
              setCurrentPoints((value) => value + 1);
              break;
          }
        }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <StatusBar style="auto" hidden />
      {!running ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              if (gameEngineRef.current) {
                gameEngineRef.current.swap(entities());
              }
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
