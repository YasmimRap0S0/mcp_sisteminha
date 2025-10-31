export default class GitHubFacade {
    async fetchRepos(perfil) {
        try {
            const response = await fetch(`https://api.github.com/users/${perfil.github}/repos?sort=updated`);
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Resposta da API:", data); 
            
            // Filtrando apenas os repositórios públicos
            const publicRepos = data.filter(repo => repo.private === false);
            console.log("Repositórios públicos:", publicRepos);

            return publicRepos;
        } catch (err) {
            console.log("Erro ao buscar repositórios pela API do Github: ", err);
            return [];
        }
    }
}