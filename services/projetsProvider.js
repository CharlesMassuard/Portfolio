export default class ProjetsProvider {

    static fetchProjets = async () => {
        try{
            const response = await fetch("../BD/portfolio.json");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching projects', error);
        }
    }

    static getProjet = async(id) => {
        try{
            const projets = await this.fetchProjets();
            return projets.projets.find(projet => projet.id == id);
        } catch (error) {
            console.error('Error fetching projects', error);
        }
    }
}