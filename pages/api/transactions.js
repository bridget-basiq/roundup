const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves a list of transactions. Each entry in the array is a separate transaction object.
 *
 * https://api.basiq.io/reference/list-all-transactions
 */

export default async function transactions(req, res) {
  const { userId, accountId } = req.query;
  try {
    const { data } = await axios.get(
      `https://au-api.basiq.io/users/${userId}/transactions?filter=account.id.eq(${accountId})`,
      {
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    // Can be used to filter based on roundup types
    // const filteredTransactions = data.data
    //   .map(transaction => {
    //     const isAvailable = transaction.status === 'available';
    //     const isTransactionAccount = transaction.class.type === 'transaction';
    //     const disabled = !isAvailable || !isTransactionAccount;
    //     return {
    //       ...transaction,
    //       disabled,
    //     };
    //   })

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
