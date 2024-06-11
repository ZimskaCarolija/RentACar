import ModelDeo from './ModelDeo';
import Kartica from './MiniKomponente/Kartica'
import NaruciHome from './MiniKomponente/NaruciHome';
import Najpopularnije from './MiniKomponente/Najpoluranije';
const App = ()=>{
return (
  <>
   <ModelDeo/>
        <div className="sadrzaj">
          <Kartica/>
          <NaruciHome/>
          <Najpopularnije/>
        </div>
  </>
  );
};

export default App;
