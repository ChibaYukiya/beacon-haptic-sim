import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const [stop, setStop] = useState("5.0");
  const [far, setFar] = useState("3.0");
  const [mid, setMid] = useState("1.5");
  const [farInt, setFarInt] = useState("1200");
  const [midInt, setMidInt] = useState("600");
  const [nearInt, setNearInt] = useState("500");
  const [nearGap, setNearGap] = useState("150");

  useEffect(() => {
    (async ()=>{
      const s = await AsyncStorage.getItem("thresholds.v2");
      if (s) {
        const t = JSON.parse(s);
        setStop(String(t.stop)); setFar(String(t.far)); setMid(String(t.mid));
        setFarInt(String(t.farInt)); setMidInt(String(t.midInt));
        setNearInt(String(t.nearInt)); setNearGap(String(t.nearGap));
      }
    })();
  }, []);

  const save = async () => {
    const data = {
      stop: parseFloat(stop), far: parseFloat(far), mid: parseFloat(mid),
      farInt: parseInt(farInt), midInt: parseInt(midInt),
      nearInt: parseInt(nearInt), nearGap: parseInt(nearGap)
    };
    await AsyncStorage.setItem("thresholds.v2", JSON.stringify(data));
    // Home�����E����悤�ɃO���[�o���ɒu���i�ȈՁj
    (globalThis as any).__beaconThresholds = data;
    alert("�ۑ����܂����BHome�^�u�Ŕ��f����܂��B");
  };

  const Field = ({label, value, set}:{label:string; value:string; set:(v:string)=>void})=>(
    <View style={{gap:6}}>
      <Text style={{color:"#6b7280"}}>{label}</Text>
      <TextInput value={value} onChangeText={set} keyboardType="numeric"
        style={{borderWidth:1, borderColor:"#e5e7eb", borderRadius:12, padding:10}} />
    </View>
  );

  return (
    <SafeAreaView style={{flex:1, padding:16, gap:12, backgroundColor:"#fff"}}>
      <Text style={{fontSize:20, fontWeight:"700"}}>�ݒ�</Text>
      <View style={{gap:12}}>
        <Field label="��~�������im�j" value={stop} set={setStop} />
        <Field label="�� min�im�j" value={far} set={setFar} />
        <Field label="�� min�im�j" value={mid} set={setMid} />
        <Field label="���C���^�[�o���ims�j" value={farInt} set={setFarInt} />
        <Field label="���C���^�[�o���ims�j" value={midInt} set={setMidInt} />
        <Field label="�߃C���^�[�o���ims�j" value={nearInt} set={setNearInt} />
        <Field label="�ߎO�A�ł̊Ԋu�ims�j" value={nearGap} set={setNearGap} />
        <Button title="�ۑ�" onPress={save} />
      </View>
    </SafeAreaView>
  );
}
