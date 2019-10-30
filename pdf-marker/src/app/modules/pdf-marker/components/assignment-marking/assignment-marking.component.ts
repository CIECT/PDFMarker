import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AssignmentService} from "@sharedModule/services/assignment.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MarkTypeIconComponent} from "@pdfMarkerModule/components/mark-type-icon/mark-type-icon.component";
import {AppService} from "@coreModule/services/app.service";
import {IconInfo} from "@pdfMarkerModule/info-objects/icon.info";
import {IconTypeEnum} from "@pdfMarkerModule/info-objects/icon-type.enum";


@Component({
  selector: 'pdf-marker-assignment-marking',
  templateUrl: './assignment-marking.component.html',
  styleUrls: ['./assignment-marking.component.scss'],
  providers: []
})
export class AssignmentMarkingComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @ViewChild('container') container: ElementRef;

  // @ts-ignore
  @ViewChild('markerContainer') markerContainer: ElementRef;

  // @ts-ignore
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;

  @ViewChild('containerRef', {read: ViewContainerRef, static: false})
  actualContainer: ViewContainerRef;

  show: boolean;
  pdfPath :string;
  pdfPages: number = 0;
  currentPage: number = 0;
  private selectedIcon: IconInfo;
  private subscription: Subscription;
  private markDetailsComponents: ComponentRef<MarkTypeIconComponent>[] = [];
  private markDetailsRawData: any[] = [];

  constructor(private renderer: Renderer2,
              private assignmentService: AssignmentService,
              private el: ElementRef,
              private resolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private router: Router,
              private appService: AppService) { }

  ngOnInit() {
    if(this.assignmentService.getSelectedPdfURL() === undefined || this.assignmentService.getSelectedPdfURL() === null){
      this.router.navigate(["/marker"]);
    } else {
      this.getAssignmentProgress();
    }

    this.subscription = this.assignmentService.selectedPdfURLChanged().subscribe(pdfPath => {
      if (pdfPath) {
        this.markDetailsComponents.forEach(componentRef => {
          componentRef.destroy();
        });
        this.getAssignmentProgress(true);
      }
    });
  }

  private openPDF() {
    this.pdfPath = this.assignmentService.getSelectedPdfURL();
  }

  private getAssignmentProgress(isSubscription: boolean = false) {
    this.appService.isLoading$.next(true);
    this.assignmentService.getSavedMarks().subscribe((marks: any[]) => {
      this.markDetailsRawData = marks;
      this.openPDF();
      if(isSubscription) {
        this.pdfViewerAutoLoad.pdfSrc = this.pdfPath; // pdfSrc can be Blob or Uint8Array
        this.pdfViewerAutoLoad.refresh();
      }
    }, error => {
      console.log("Error fetching marks");
      this.appService.isLoading$.next(false);
    });
  }

  onSelectedIcon(selectedIcon: string) {
    try {
      this.selectedIcon = JSON.parse(selectedIcon);
      this.renderer.addClass(this.markerContainer.nativeElement, 'pdf-marker-dropzone');
    } catch (e) {
      console.log('None selected');
      this.selectedIcon = undefined;
      this.renderer.removeClass(this.markerContainer.nativeElement, 'pdf-marker-dropzone');
    }
  }

  pagesLoaded(pageNumber) {
    this.pdfPages = pageNumber;
    this.markDetailsComponents = [];
    const intersections = [];
    this.currentPage = this.pdfViewerAutoLoad.PDFViewerApplication.page;
    const observe = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting === true) {
        console.log(entries[0].target);
        this.currentPage = parseInt(entries[0].target.attributes[1].value);
      }
    }, {threshold:[0.5]});
    for(let i = this.currentPage; i <= this.pdfPages; i++) {
      observe.observe(this.pdfViewerAutoLoad.PDFViewerApplication.pdfViewer.viewer.children[i - 1]);
    }
    this.container.nativeElement.style.height = this.pdfViewerAutoLoad.PDFViewerApplication.pdfViewer.viewer.children[this.currentPage - 1].clientHeight + 'px';
    this.markerContainer.nativeElement.style.height = this.pdfViewerAutoLoad.PDFViewerApplication.pdfViewer.container.scrollHeight + 'px';
    this.container.nativeElement.style.height = this.pdfViewerAutoLoad.PDFViewerApplication.pdfViewer.container.scrollHeight + 'px';

    // Set Marks if exists
    for(let i = 0; i < this.markDetailsRawData.length; i++) {

      const factory: ComponentFactory<MarkTypeIconComponent> = this.resolver.resolveComponentFactory(MarkTypeIconComponent);
      const componentRef = this.actualContainer.createComponent(factory);

      const top = this.markDetailsRawData[i].coordinates.y;
      const left = this.markDetailsRawData[i].coordinates.x;

      this.renderer.setStyle(componentRef.location.nativeElement, 'position', 'absolute');
      this.renderer.setStyle(componentRef.location.nativeElement, 'top', ((top < 0) ? 0:top) + 'px');
      this.renderer.setStyle(componentRef.location.nativeElement, 'left', ((left < 0) ? 0:left) + 'px');

      componentRef.instance.setComponentRef(componentRef);
      componentRef.instance.setIndex(i);
      componentRef.instance.iconName = this.markDetailsRawData[i].iconName;
      componentRef.instance.setMarkType(this.markDetailsRawData[i].iconType);
      this.markDetailsComponents.push(componentRef);
    }
    this.show = true;
    this.appService.isLoading$.next(false);
  }

  onPageChanged(pageNumber) {
    console.log(pageNumber);
    this.currentPage = pageNumber;
  }

  onDropClick(event) {
    if(this.selectedIcon) {
      switch (this.selectedIcon.type) {
        case IconTypeEnum.FULL_MARK:
        case IconTypeEnum.HALF_MARK:  this.createMarkIcon(event);
                                      break;
        default:  console.log("No icon type found!");
                  break;
      }
    }
  }

  onControl(control: string) {
    switch (control) {
      case 'save':  this.saveMarks();
                    break;
      default:      console.log("No control '" + control + "' found!");
                    break;
    }
  }

  private saveMarks() {
    const markDetails = [];
    for(let i = 0; i < this.markDetailsComponents.length; i++) {
      const markType = this.markDetailsComponents[i].instance;
      if(!markType.deleted) {
        markDetails[i] = { coordinates: markType.getCoordinates(), iconName: markType.iconName, iconType: markType.getMarkType() }
      }
    }
    this.appService.isLoading$.next(true);
    this.assignmentService.saveMarks(markDetails).subscribe((response: any) => {
      this.appService.isLoading$.next(false);
    }, error => {
      this.appService.isLoading$.next(false);
    });
  }

  private createMarkIcon(event) {
    const factory: ComponentFactory<MarkTypeIconComponent> = this.resolver.resolveComponentFactory(MarkTypeIconComponent);
    const componentRef = this.actualContainer.createComponent(factory);

    this.renderer.setStyle(componentRef.location.nativeElement, 'position', 'absolute');
    const minWidth = this.markerContainer.nativeElement.scrollWidth - componentRef.instance.dimensions;
    const minHeight = this.markerContainer.nativeElement.scrollHeight - componentRef.instance.dimensions;

    const top = event.offsetY - (componentRef.instance.dimensions / 2);
    const left = event.offsetX -  (componentRef.instance.dimensions / 2);

    this.renderer.setStyle(componentRef.location.nativeElement, 'top', ((top < 0) ? 0:((top > minHeight) ? minHeight:top)) + 'px');
    this.renderer.setStyle(componentRef.location.nativeElement, 'left', ((left < 0) ? 0:((left > minWidth) ? minWidth:left)) + 'px');

    const newIndex = this.markDetailsComponents.push(componentRef) - 1;
    componentRef.instance.setComponentRef(componentRef);
    componentRef.instance.iconName = this.selectedIcon.icon;
    componentRef.instance.setIndex(newIndex);
    componentRef.instance.setMarkType(this.selectedIcon.type);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}