import Item from '../model/Item';

class ItemService {
  private items: Item[] = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
  ];

  getAllItems(): Item[] {
    return this.items;
  }

  addItem(title: string): void {
    const newItem: Item = {
      id: Date.now().toString(),
      title: title.trim(),
    };
    this.items.push(newItem);
  }

  updateItem(id: string, newTitle: string): void {
    this.items = this.items.map(item =>
      item.id === id ? { ...item, title: newTitle.trim() } : item
    );
  }

  deleteItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }
}

export default new ItemService();
