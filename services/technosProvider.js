export default class TechnosProvider {

    static fetchTechnos = async () => {
        try{
            const response = await fetch("../BD/portfolio.json");
            const data = await response.json();
            return data.technologies;
        } catch (error) {
            console.error('Error fetching technos', error);
        }
    }

    static getTechno = async(nom) => {
        try{
            const technos = await this.fetchTechnos();
            return technos.find(techno => techno.nom == nom);
        } catch (error) {
            console.error('Error fetching technos', error);
        }
    }
}