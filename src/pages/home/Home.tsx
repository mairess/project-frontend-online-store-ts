import CategoryList from '../../components/CategoryList/CategoryList';

function Home() {
  return (
    <>
      <div>
        <input
          type="text"
          name=""
          id=""
        />
      </div>
      <CategoryList />
      <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2>
    </>
  );
}

export default Home;
