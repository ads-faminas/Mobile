import { useState, useEffect } from 'react';
import Item from '../model/Item';
import ItemService from '../services/ItemService';
import { Alert } from 'react-native';

export const useItemController = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [inputText, setInputText] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const allItems = ItemService.getAllItems();
    setItems([...allItems]);
  };

  const addItem = () => {
    if (!inputText.trim()) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }
    ItemService.addItem(inputText);
    loadItems();
    closeDialog();
  };

  const openDialog = () => {
    setInputText('');
    setEditingItem(null);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setInputText('');
    setEditingItem(null);
    setDialogVisible(false);
  };

  const openEditModal = (item: Item) => {
    setInputText(item.title);
    setEditingItem(item);
    setDialogVisible(true);
  };

  const updateItem = () => {
    if (!inputText.trim() || !editingItem) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }
    ItemService.updateItem(editingItem.id, inputText);
    loadItems();
    closeDialog();
  };

  const deleteItem = () => {
    if (!editingItem) return;
    ItemService.deleteItem(editingItem.id);
    loadItems();
    closeDialog();
  };

  return {
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
  };
};
