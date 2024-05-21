export const getASRUrl = ({ devDomain, devASRPort, prodDomain, prodRoute }) => {
  const isHTPPS = location.protocol === 'https:';
  const prefix = isHTPPS ? 'wss://' : 'ws://';
  const defaultHost = location.hostname;

  const suffix = !isHTPPS ? `${devDomain || defaultHost}:${devASRPort}` : `${prodDomain || defaultHost}/${prodRoute}`;
  return `${prefix}${suffix}/WEBService/ServiceServer2`;
};
