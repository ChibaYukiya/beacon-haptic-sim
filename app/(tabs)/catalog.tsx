import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, FlatList, Pressable, StyleSheet } from "react-native";
import * as Speech from "expo-speech";

const DATA = [
  { id: "milk", name: "���������������� 1L", shelf: "A-12", category: "�����i" },
  { id: "bread", name: "�H�p�� 6���؂�", shelf: "B-07", category: "�p��" },
  { id: "coffee", name: "���M�����[�R�[�q�[ 200g", shelf: "C-03", category: "����" },
];

export default function Catalog() {
  const [q, setQ] = useState("");

  const filtered = DATA.filter(item => item.name.includes(q) || item.category.includes(q));

  return (
    <SafeAreaView style={{flex:1, padding:16, gap:12, backgroundColor:"#fff"}}>
      <Text style={{fontSize:20, fontWeight:"700"}}>���i�J�^���O�i�f���j</Text>
      <TextInput
        placeholder="���i���Ō���"
        value={q}
        onChangeText={setQ}
        style={{borderWidth:1, borderColor:"#e5e7eb", borderRadius:12, padding:12}}
      />
      <FlatList
        data={filtered}
        keyExtractor={(i)=>i.id}
        renderItem={({item})=>(
          <Pressable
            onPress={()=>{
              Speech.stop();
              Speech.speak(`${item.name}�A�I ${item.shelf} �ɂ��ē����܂��B`, { language: "ja-JP" });
              alert(`�ړI�n��ݒ�F${item.name}\n�I: ${item.shelf}`);
            }}
            style={({pressed})=>[{opacity: pressed?0.5:1}, styles.card]}
          >
            <Text style={{fontWeight:"700"}}>{item.name}</Text>
            <Text style={{color:"#6b7280"}}>{item.category} / �I {item.shelf}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={()=><View style={{height:8}} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor:"#f8fafc", borderWidth:1, borderColor:"#e5e7eb", borderRadius:16, padding:16 }
});
