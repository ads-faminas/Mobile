
import { useContext, useState } from 'react';
import Item from '../model/Item';
import ItemService from '../services/ItemService';
import { Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';


export const useItemController = () => {
  const { state, dispatch } = useAppContext();
  const [inputText, setInputText] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const addItem = async (title: string, description: string) => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }
    const newItem = await ItemService.addItem(title, description);
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    closeDialog();
  };

  const openDialog = () => {
    setInputText('');
    setInputDesc('');
    setEditingItem(null);
    dispatch({ type: 'TOGGLE_DIALOG' });
  };

  const closeDialog = () => {
    setInputText('');
    setInputDesc('');
    setEditingItem(null);
    dispatch({ type: 'TOGGLE_DIALOG' });
  };

  const openEditModal = (item: Item) => {
    setInputText(item.title);
    setInputDesc(item.description);
    setEditingItem(item);
    dispatch({ type: 'TOGGLE_DIALOG' });
  };

  const updateItem = (title: string, description: string) => {
    if (!title.trim() || !editingItem) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }
    ItemService.updateItem(editingItem.id, title);
    // Para simplificação, não atualiza descrição/breed localmente
    dispatch({ type: 'REMOVE_ITEM', payload: editingItem.id });
    dispatch({ type: 'ADD_ITEM', payload: { ...editingItem, title, description } });
    closeDialog();
  };

  const deleteItem = () => {
    if (!editingItem) return;
    ItemService.deleteItem(editingItem.id);
    dispatch({ type: 'REMOVE_ITEM', payload: editingItem.id });
    closeDialog();
  };

  return {
    items: state.items,
    dialogVisible: state.dialogOpen,
    inputText,
    setInputText,
    inputDesc,
    setInputDesc,
    editingItem,
    addItem,
    openDialog,
    closeDialog,
    openEditModal,
    updateItem,
    deleteItem,
  };
};
