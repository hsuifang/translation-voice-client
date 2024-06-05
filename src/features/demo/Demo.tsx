function witdhLoading(Component) {
  return function WithLoading({ isloading, ...props } = { isloading: false }) {
    return isloading ? <div>Loading...</div> : <Component {...props} />;
  };
}

export default witdhLoading;
