const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint refreshes the connection in order to retrieve the latest financial data.
 * This should only be used ad-hoc if user initiates. For regular refreshes partners should rely on the smart cache.
 *
 * https://api.basiq.io/reference/refresh-a-connection
 */

 export default async function refreshConnection(req, res) {
    const { userId, connectionId } = req.query
    try {
      const { data } = await axios({
        method: 'post',
        url: `https://au-api.basiq.io/users/${userId}/connections/${connectionId}/refresh`,
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}
