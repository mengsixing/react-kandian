import dva from 'dva';
import './index.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://211.149.160.35';

// 1. Initialize
const app = dva();

// 2. Plugins
 app.use({});

// 3. Model
 app.model(require('./models/app').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
