const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves a single account.
 *
 * https://api.basiq.io/reference/retrieve-an-account
 */

export default async function account(req, res) {
  const { userId, accountId } = req.query;
  try {
    const { data } = await axios.get(
      `https://au-api.basiq.io/users/${userId}/accounts/${accountId}`,
      {
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
