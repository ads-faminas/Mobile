import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useItemController } from '../controllers/ItemController';
import Item from '../model/Item';

const ItemView = () => {
  const {
    items,
    dialogVisible,
    inputText,
    setInputText,
    editingItem,
    addItem,
    openDialog,
    closeDialog,
    openEditModal,
    updateItem,
    deleteItem,
  } = useItemController();

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openEditModal(item)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>

      <TouchableOpacity style={styles.addButton} onPress={openDialog}>
        <Text>Adicionar Item</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Modal visible={dialogVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.dialog}>
            <Text style={styles.modalTitle}>
              {editingItem ? 'Editar Item' : 'Novo Item'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite o título"
              value={inputText}
              onChangeText={setInputText}
            />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={closeDialog}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              {editingItem && (
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={deleteItem}
                >
                  <Text style={[styles.buttonText, styles.deleteButtonText]}>
                    Excluir
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={editingItem ? updateItem : addItem}
              >
                <Text style={styles.buttonText}>
                  {editingItem ? 'Salvar' : 'Adicionar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialog: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#d3d3d3',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#fff',
  },
});
