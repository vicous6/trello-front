import axios from 'axios'

export default class TrelloOAuth {
  clientId
  redirectUri
  state
  scope

  constructor(redirectUri, scope = 'read,write', state = 'uniqueStateString') {
    this.clientId = 'df70de8f9a2c5adf190d43213c586487'
    this.redirectUri = redirectUri
    this.scope = scope
    this.state = state
  }

  /**
   * Génère l'URL de redirection pour l'authentification OAuth de Trello.
   */
  getAuthorizationUrl() {
    console.log({
      clientId: this.clientId
    })
    console.log(
      'https://trello.com/1/authorize?response_type=token&key=',
      this.clientId,
      '&return_url=',
      encodeURIComponent(this.redirectUri),
      '&scope=',
      this.scope,
      '&expiration=never&name=TrellTech&state=',
      this.state
    )
    return `https://trello.com/1/authorize?response_type=token&key=${this.clientId}&return_url=${encodeURIComponent(this.redirectUri)}&scope=${this.scope}&expiration=never&name=TrellTech&state=${this.state}`
  }

  /**
   * Échange le code d'autorisation contre un token d'accès.
   * Cette fonction est présentée pour la complétude mais n'est pas directement utilisable avec Trello.
   */
  async exchangeCodeForAccessToken(code) {
    const response = await axios.post('http://trello.com/1/OAuthGetAccessToken', {
      code: code,
      client_id: this.clientId,
      client_secret: 'df70de8f9a2c5adf190d43213c586487',
      redirect_uri: this.redirectUri,
      grant_type: 'authorization_code'
    })
    console.log(response.data.access_token)
    return response.data.access_token
  }
}
