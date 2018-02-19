var qualityLevel = 30;
var allTexture2Nodes = eon.FindByProgID("EONVisualNodes.Texture2.1");
for (var i=0; i<allTexture2Nodes.Count; i++)
{
    allTexture2Nodes.item(i).GetFieldByName("AsynchronousLoad").Value = true;
	allTexture2Nodes.item(i).GetFieldByName("UseGroupSettings").value = false; //Disabled group settings
	allTexture2Nodes.item(i).GetFieldByName("AsynchronousLoad").value = true; //Disabled group settings
    allTexture2Nodes.item(i).GetFieldByName("MaxWidth").value = 2048; //Changed MaxWidth from 65536 to 2048
    allTexture2Nodes.item(i).GetFieldByName("MaxHeight").value = 2048; //Changed MaxHeight from 65536 to 2048
    allTexture2Nodes.item(i).GetFieldByName("Mipmap").value = true; //Changed Mipmap to true
    allTexture2Nodes.item(i).GetFieldByName("MinFilter").value = 5; //Changed MinFilter to Linear Mip Linear
    allTexture2Nodes.item(i).GetFieldByName("MagFilter").value = 1; //Changed MagFilter to Linear
    allTexture2Nodes.item(i).GetFieldByName("QualityLevel").value = qualityLevel; //Changed QualityLevel from 100 to ...
    allTexture2Nodes.item(i).GetFieldByName("DistributionFormat").value = 13; //Changed DistributionFormat from 0 to ETC2
}

var allMesh3GroupNodes = eon.FindByProgID("EONVisualNodes.Mesh3PropertiesNode.1");
for (var i=0; i<allMesh3GroupNodes.Count; i++)
{
    allMesh3GroupNodes.item(i).GetFieldByName("AsynchronousLoad").Value = true;
}
