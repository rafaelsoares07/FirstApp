import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config"
import Routes from './routes';


export default function App() {
  return(
    <GluestackUIProvider config={config}>
      <Routes/>
    </GluestackUIProvider>
    
  )
}

