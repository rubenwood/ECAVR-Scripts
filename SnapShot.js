
//Set Window Size
eon.FindNode('Simulation').GetFieldByName('SetRun').value = true;
eon.FindNode('Simulation').GetFieldByName('FixedWidth').value = 512;
eon.FindNode('Simulation').GetFieldByName('FixedHeight').value = 512;
eon.FindNode('Simulation').GetFieldByName('IsFixedSize').value = true;

//Snapshot
eon.SaveSnapShot("C:\\Bin\\ScreenshotColor.png",2,0);

//Check
eon.MessageBox(eon.FindNode('Simulation').GetFieldByName('FixedWidth').value, 'title');
eon.MessageBox("C:\\Bin\\ScreenshotColor.png", 'title');

//
//"C:/Program Files/EON Reality/EON Viewer 9.21.25.21479/Bin/EonViewer.exe" 
//"C:/Bin/PocketWatch6/pocketwatch6.eop"