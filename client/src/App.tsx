import './App.scss';
import Switcher from './components/Switcher';
import Home from './components/Home';
import Submission from './components/Submission';
import { useState } from 'react';
import Insights from './components/Insights';
import Browse from './components/Browse';

function App() {
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [file, setFile] = useState<File>(new File([], 'X'));
  const [page, setPage] = useState('Home');

  return (
    <div className="app">
      {page === 'Home' ? <Home change={file}/> : page === 'Insights' ? <Insights setPage={setPage}/> : <Browse setPage={setPage}/>}
      <Switcher submission={setSubmissionOpen} setFile={setFile} setPage={setPage}/>
      <Submission open={submissionOpen} setOpen={setSubmissionOpen} file={file} setFile={setFile}/>
    </div>
  );
}

export default App;
