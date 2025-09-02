import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import { useItemController } from '../controllers/ItemController';
import Item from '../model/Item';
import { IconButton, MD3Colors, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

type FormData = {
  title: string;
};

const ItemView = () => {
  const {
    items,
    dialogVisible,
    setInputText,
    editingItem,
    addItem,
    openDialog,
    closeDialog,
    openEditModal,
    updateItem,
    deleteItem,
  } = useItemController();

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { title: '' },
  });

  const onSubmit = (data: FormData) => {
    if (editingItem) {
      updateItem(data.title);
      Toast.show({ type: 'success', text1: 'Item atualizado!' });
    } else {
      addItem(data.title);
      Toast.show({ type: 'success', text1: 'Item adicionado!' });
    }
    reset();
  };

  const handleDelete = () => {
    deleteItem();
    Toast.show({ type: 'error', text1: 'Item excluído!' });
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openEditModal(item)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>

      <TouchableOpacity style={styles.addButton} onPress={openDialog}>
        <IconButton icon="plus" iconColor={MD3Colors.error50} size={20} />
      </TouchableOpacity>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal */}
      <Modal visible={dialogVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.dialog}>
            <Text style={styles.modalTitle}>
              {editingItem ? 'Editar Item' : 'Novo Item'}
            </Text>

            <Controller
              control={control}
              name="title"
              rules={{ required: 'O título é obrigatório' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={{ width: '100%', marginBottom: 15 }}>
                  <TextInput
                    mode="outlined"
                    label="Digite o título"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                      setInputText(text);
                    }}
                    style={styles.input}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={closeDialog}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              {editingItem && (
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Text style={[styles.buttonText, styles.deleteButtonText]}>
                    Excluir
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.buttonText}>
                  {editingItem ? 'Salvar' : 'Adicionar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Toast container */}
      <Toast />
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
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch', // garante que input expanda
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
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
