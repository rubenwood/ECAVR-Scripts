var shapeProgID = 'EONVisualNodes.Shape.1';
var frameProgID = 'EonD3D.Frame.1';

var allMeshes = eon.FindByProgID(shapeProgID);
var allFrames = eon.FindByProgID(frameProgID);
var rootNode = eon.FindNode('RootNode');

for(var i = 0; i < allMeshes.count; i++){
	//eon.Trace(eon.GetNodeName(allMeshes.item(i)));
	eon.CopyNode(allMeshes.item(i), allMeshes.item(i).GetParentNode().GetParentNode());
	//allMeshes.item(i).GetParentNode().GetParentNode().GetFieldByName('WorldPosition').value = allMeshes.item(i).GetParentNode().GetFieldByName('WorldPosition').value;
	//allMeshes.item(i).GetParentNode().GetParentNode().GetFieldByName('WorldOrientation').value = allMeshes.item(i).GetParentNode().GetFieldByName('WorldOrientation').value;
	//allMeshes.item(i).GetParentNode().GetParentNode().GetFieldByName('WorldScale').value = allMeshes.item(i).GetParentNode().GetFieldByName('WorldScale').value;
	eon.DeleteNode(allMeshes.item(i).GetParentNode());
}

var framesWithDollar = eon.Find(/\$/);

while(framesWithDollar.count > 0){
	firstWP = framesWithDollar.item(framesWithDollar.count-1).GetFieldByName('TreeChildren').GetMFElement(0).GetFieldByName('WorldPosition').value;
	firstWO = framesWithDollar.item(framesWithDollar.count-1).GetFieldByName('TreeChildren').GetMFElement(0).GetFieldByName('WorldOrientation').value;
	firstWS = framesWithDollar.item(framesWithDollar.count-1).GetFieldByName('TreeChildren').GetMFElement(0).GetFieldByName('WorldScale').value;

	eon.CopyNode(framesWithDollar.item(framesWithDollar.count-1).GetFieldByName('TreeChildren').GetMFElement(0), rootNode.GetParentNode());
	
	deleteDollar(framesWithDollar.item(framesWithDollar.count-1));

	var lastFrameChild = rootNode.GetParentNode().GetFieldByName('TreeChildren').GetMFElement(rootNode.GetParentNode().GetFieldByName('TreeChildren').GetMFCount()-1);
	lastFrameChild.GetFieldByName('WorldPosition').value = firstWP;
	lastFrameChild.GetFieldByName('WorldOrientation').value = firstWO;
	lastFrameChild.GetFieldByName('WorldScale').value = firstWS;

	framesWithDollar = eon.Find(/\$/);
}

eon.DeleteNode(rootNode);


function deleteDollar(thisNode){
	if(eon.GetNodeName(thisNode.GetParentNode()) != 'RootNode'){
		thisNode = thisNode.GetParentNode();
		deleteDollar(thisNode)
	}else{
		eon.DeleteNode(thisNode);
	}
}