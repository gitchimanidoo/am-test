export class CharacterService {
    static characterCache = new Map();

    static mapCharacter(character) {
        return {
            id: character.id,
            image: character.image,
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            origin: character.origin,
            location: character.location,
            created: character.created,
            createdFormatted: CharacterService.formatDate(character.created)
        };
    }

    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    static async getCharactersPage(page = 1) {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // for testing spinner
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json();
            
            const characters = data.results.map(char => {
                const mapped = this.mapCharacter(char);                
                this.characterCache.set(mapped.id, mapped);
                return mapped;
            });
            
            return {
                characters,
                hasNextPage: data.info.next !== null
            };
        } catch (error) {
            console.error('Error fetching characters:', error);
            return {
                characters: [],
                hasNextPage: false
            };
        }
    }

    static async getCharacterById(id) {
        const numericId = parseInt(id);
        
        if (this.characterCache.has(numericId)) {
            return this.characterCache.get(numericId);
        }
        
        try {            
            const response = await fetch(`https://rickandmortyapi.com/api/character/${numericId}`);
            const data = await response.json();
            const character = this.mapCharacter(data);
            this.characterCache.set(numericId, character);
            return character;
        } catch (error) {
            console.error('Error fetching character:', error);
            return null;
        }
    }
}
