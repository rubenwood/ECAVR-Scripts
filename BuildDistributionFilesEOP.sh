#!/bin/bash

# make sure file extension is lowercase!!!

# Following prerequestics are expected:
#   Path to include where current EONContentTool.exe is located, normally something like
#      C:\Program Files\EON Reality\EON 9.14.5.15442\Bin
#   Path to include where this file is located, recommended is c:\Bin
#   Environmentvariable EONCONTENTTOOLUTILITIESDIR shall exist 
#      and point to folder where ModifyTextureSettings.js is located

for dir in *; do
	if [[ -d $dir ]]; then

		echo "---------------------------------------------------->"
		echo "----> processing $dir"
		echo
 		pushd $dir >> /dev/null
		
		echo "---> rename files to lowercase"
		# The following command will rename all of the fbx files to lowercase
		# We only want to rename the fbx at this stage, NOT the textures in the folder, that will break the textures
		for i in *; do
			d=$(echo ${i} |tr [:upper:] [:lower:]);
			if [[ ${d} != ${i} ]];	then
				echo "renaming:" ${i} ${d}
				mv ${i} ${d}
			fi
		done
		ls
		
		#echo "---> Create EOZ (for snapshot)"
		#EONContentTool.exe import -s *.fbx
		
		#Run template, with eop injected
		#Take a snapshot (create thumbnails)
		#EONContentTool.exe edit --inplace --script "$EONCONTENTTOOLUTILITIESDIR/SnapShot.js" *.eoz
		
		#echo $dir
		#mv C:\\Bin\\ScreenshotColor.png $dir\\ScreenshotColor.png

		###
		
		echo "---> import FBX"
		# this will import an fbx and convert it to EOP
		# make sure textures are in same dir
		EONContentTool.exe import *.fbx
		
		# EXPERIMENTAL
		# This will clean the eop after it has been 'imported' with teh above command
		EONContentTool.exe edit --inplace --filename "edit_%i" --script "$EONCONTENTTOOLUTILITIESDIR/fbx2eopClean.js" *.eop
		#
		
		echo "----> Migrate $dir"
		# This will 
		#	Tag file to current version
		#   Convert deprecated nodes
		#   Remove non-cenvertible nodes
		# Use the command
		# EONContentTool.exe help migrate
		# to see possible options
		EONContentTool.exe migrate --filename "v1_%i" --inplace edit_*.eop

		echo "----> Adapt to Android mobile $dir"
		# This will
		#   Convert nodes to that have converters for the specified platforms.
		#   Remove unsupported nodes
		#   Run a script that will modify texture settings as a preparation for creation of distribuyion files
		EONContentTool.exe edit --inplace --adapt "android" --filename "%i" --script "$EONCONTENTTOOLUTILITIESDIR/ModifyTextureSettingsAndroid.js" v1_*.eop
	
		#echo "----> Make Prototype"
		# This will create a prototype file with same name as the infile, but extension .eop
		#EONContentTool.exe make-prototype --path Simulation/Scene/$1 --filename "%i" --inplace v1_*android.eop
		
		echo "----> Make Android Distribution $dir"
 		EONContentTool.exe dist --inplace --platform "android" --compression-method "Store" v1_*.eop
		
		echo "----> Adapt to iOS mobile $dir"
		# This will
		#   Convert nodes to that have converters for the specified platforms.
		#   Remove unsupported nodes
		#   Run a script that will modify texture settings as a preparation for creation of distribuyion files
		EONContentTool.exe edit --inplace --adapt "iOS" --filename "%i_iOS" --script "$EONCONTENTTOOLUTILITIESDIR/ModifyTextureSettingsiOS.js" v1_*.eop
			
		#echo "----> Make Prototype"
		# This will create a prototype file with same name as the infile, but extension .eop
		#EONContentTool.exe make-prototype --path Simulation/Scene/$1 --filename "%i" --inplace v1_*iOS.eop
		
		echo "----> Make iOS Distribution $dir"
 		EONContentTool.exe dist --inplace --platform "ios" --compression-method "Store" v1_*iOS.eop
			
	popd >> /dev/null
	fi
done
