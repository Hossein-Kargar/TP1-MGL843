"
Cette classe permet d’exporter les métriques des classes
issues d’un modèle FAMIX TypeScript vers un fichier CSV.

Les données exportées sont utilisées pour la visualisation
dans Roassal (diagrammes en rectangles proportionnels).
"
Class {
	#name : 'TP1TSClassCSVExporter',
	#superclass : 'Object',
	#category : 'TP1-Exporter',
	#package : 'TP1-Exporter'
}

{ #category : 'exporting' }
TP1TSClassCSVExporter class >> exportClassesToCSV: aFilePathString [
    | model classes fileRef writer |

    model := MooseModel root first.
    classes := model allModelClasses.

    fileRef := aFilePathString asFileReference.

    fileRef writeStreamDo: [ :stream |
        writer := NeoCSVWriter on: stream.
        writer separator: $,.

        writer nextPut: #(className numberOfAttributes numberOfMethods numberOfLinesOfCode).

        classes do: [ :aClass |
            writer nextPut: {
                aClass name.
                aClass numberOfAttributes.
                aClass numberOfMethods.
                aClass numberOfLinesOfCode
            }.
        ].
    ].

]
