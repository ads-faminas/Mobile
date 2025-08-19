import React, {useState} from 'react';
import { Image } from 'expo-image';
import { StyleSheet,View, Text,FlatList,Modal,Pressable,TextInput} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [image, setImage] = useState('');
  const [data, setData] = useState<any[]>([]);

  const adicionarItem = () => {
    const novoItem = { 
      id: Date.now().toString(),
      title: titulo, 
      descricao: descricao, 
      image: image 
    };

    setData([...data, novoItem]);
    setTitulo('');
    setDescricao('');
    setImage('');
    setModalVisible(false); 
  };

  const Item = ({ title, descricao, image }) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.image}>

        {image ? (
          <Image source={{ uri: image }} style={ styles.exibImg} />
        ) : null}

      </View>

      <Text style={styles.description}>
        {descricao}
      </Text>

    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>

         <View style={styles.container}>  
          <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Cadastrar Item</Text>
          </Pressable>
        </View>

        <FlatList 
          data={data} 
          renderItem={({ item }) => (
            <Item title={item.title} descricao={item.descricao} image={item.image} />
          )}
          keyExtractor={item => item.id}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput value={titulo} onChangeText={setTitulo} style={styles.input} placeholder="Titulo"/>
              <TextInput value={descricao} onChangeText={setDescricao} style={styles.input} placeholder="Descrição" />
              <TextInput value={image} onChangeText={setImage} style={styles.input} placeholder="Link da imagem"/>

              <Pressable style={[styles.button, styles.buttonSave]} onPress={adicionarItem}>
                <Text style={styles.textStyle}>Cadastrar</Text>
              </Pressable>

              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Fechar modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 14,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    minWidth: 120
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonSave: {
    backgroundColor: '#0a942c',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 8
  },
  image: {
    display:'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  exibImg: { width: 100, height: 100, marginTop: 5 }
});
