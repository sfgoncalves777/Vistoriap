export default async function clearCache (req, res) {
  const { token, page } = req.query;
  if (token != process.env.TOKEN_API) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
  await res.revalidate(`/buscar/${page}`);
  return res.status(200).json({ message: 'Sucesso ao limpar o cache.' });
};