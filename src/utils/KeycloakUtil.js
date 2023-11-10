import Keycloak from 'keycloak-js';

const keycloakConfig = {
    realm: 'Whiteboard',
    url: 'http://localhost:8080/',
    clientId: 'whiteboard',
};

const keycloak = new Keycloak(keycloakConfig);


export const logout = () => {
    keycloak.logout();
}

export const getUser = () => {
    return keycloak.tokenParsed || {};
}

export default keycloak;

