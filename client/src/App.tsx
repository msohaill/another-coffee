import './App.scss';
import Switcher from './components/Switcher';
import Home from './components/Home';
import Submission from './components/Submission';
import { useState } from 'react';

function App() {
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [file, setFile] = useState<File>(new File([], 'X'));

  return (
    <div className="app">
      <Home/>
      <Switcher submission={setSubmissionOpen} setFile={setFile}/>
      <Submission open={submissionOpen} setOpen={setSubmissionOpen} file={file}/>
    </div>
  );
}

export default App;
