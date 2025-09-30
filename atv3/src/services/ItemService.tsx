import Item from '../model/Item';


class ItemService {
  private items: Item[] = [
    {
      id: '1',
      title: 'Item 1',
      description: 'Descrição do item 1',
      image: 'https://placehold.co/200x200',
      breed: 'Desconhecida',
    },
    {
      id: '2',
      title: 'Item 2',
      description: 'Descrição do item 2',
      image: 'https://placehold.co/200x200',
      breed: 'Desconhecida',
    },
  ];

  getAllItems(): Item[] {
    return this.items;
  }

  async addItem(title: string, description: string): Promise<Item> {
    // Busca imagem aleatória de cachorro
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await res.json();
    const imageUrl = data.message;

    // Extrai a raça da URL da imagem
    let breed = 'Desconhecida';
    const breedMatch = imageUrl.match(/breeds\/([a-zA-Z0-9-]+)\//);
    if (breedMatch && breedMatch[1]) {
      breed = breedMatch[1].replace(/-/g, ' ');
    }

    const newItem: Item = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      image: imageUrl,
      breed,
    };

    this.items.push(newItem);
    return newItem;
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
