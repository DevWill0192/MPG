import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, computed, signal, inject } from '@angular/core';
import { CircleProgressComponent } from '../circle-progress/circle-progress.component';
import { ActiviesEntriesService } from '../../../core/services/activies-entries.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Kpi {
  nombre: string;
  tipo: 'Cartones' | 'Hectolitros';
  meta: number;
  avance: number;
  porcentaje: number;
  color: string;

}

interface EntryData {
  data?: {
    [key: string]: string | number;
  };
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, CircleProgressComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
  private activiesEntriesService = inject(ActiviesEntriesService);

  // Signals para estado reactivo
  public entriesData = signal<EntryData[]>([]);
  filtroSeleccionado = signal<'Cartones' | 'Hectolitros'>('Cartones');
  isVisible = signal(false);

  // Computed values para evitar recálculos
  kpis = computed(() => this.generateKpiPromedios(this.entriesData(), this.filtroSeleccionado()));
  porcentajeAvance = computed(() => this.getPorcentajeAvance());
  filteredKpis = computed(() => this.filterKpisByType(this.kpis(), this.filtroSeleccionado()));

  data = {
    volumen_meta_mes_hectolitros: 72.572016,
    volumen_meta_mes_cartones: 907.150206,
    volumen_avance_actual_hectolitros: 49.79,
    volumen_avance_actual_cartones: 558.0
  };

  constructor() {
    // Cargar datos una sola vez al inicializar
    this.loadData();
  }

  private loadData() {
    console.log('Iniciando carga de datos...');
    this.activiesEntriesService.activiesEntries()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servicio:', response);
          const entries = response?.data?.entries ?? [];
          console.log('Entries extraídos:', entries);
          this.entriesData.set(entries);
          console.log('KPIs generados:', this.kpis());
        },
        error: (error) => {
          console.error('Error fetching activities entries:', error);
        }
      });
  }

  toggleVisibility() {
    this.isVisible.update(visible => !visible);
  }

  private getPorcentajeAvance(): number {
    if (this.filtroSeleccionado() === 'Cartones') {
      return Math.round((this.data.volumen_avance_actual_cartones / this.data.volumen_meta_mes_cartones) * 100);
    } else {
      return Math.round((this.data.volumen_avance_actual_hectolitros / this.data.volumen_meta_mes_hectolitros) * 100);
    }
  }

  setFiltro(tipo: 'Cartones' | 'Hectolitros') {
    this.filtroSeleccionado.set(tipo);
    this.isVisible.set(false);
  }

  private filterKpisByType(kpis: Kpi[], type: 'Cartones' | 'Hectolitros'): Kpi[] {
    return kpis.filter(kpi => kpi.tipo === type);
  }

  getAvanceTotalPorcentaje(): number {
    const kpisData = this.kpis();
    const totalMeta = kpisData.reduce((sum, kpi) => sum + kpi.meta, 0);
    const totalAvance = kpisData.reduce((sum, kpi) => sum + kpi.avance, 0);

    if (totalMeta === 0) return 0;
    return parseFloat(((totalAvance / totalMeta) * 100).toFixed(2));
  }

  // TrackBy function para optimizar *ngFor
  trackByKpi(index: number, kpi: Kpi): string {
    return `${kpi.nombre}-${kpi.tipo}`;
  }

  private generateKpiPromedios(entries: EntryData[], tipo: 'Cartones' | 'Hectolitros'): Kpi[] {
    console.log('generateKpiPromedios llamado con:', { entries, tipo });
    const isCartones = tipo === 'Cartones';

    const resultados = {
      Volumen: { meta: 0, avance: 0, count: 0 },
      VolumenRetornable: { meta: 0, avance: 0, count: 0 },
      AboveCoreBeyondBeer: { meta: 0, avance: 0, count: 0 },
      Marketplace: { meta: 0, avance: 0, count: 0 },
      color: 'rgba(33, 150, 243, 0.8)'
    };

    for (const entry of entries) {
      const data = entry.data || {};
      console.log('Procesando entry data:', data);

      // Volumen
      const volumenMeta = parseFloat(data[isCartones ? 'volumen_meta_mes_cartones' : 'volumen_meta_mes_hectolitros']?.toString() || '0');
      const volumenAvance = parseFloat(data[isCartones ? 'volumen_avance_actual_cartones' : 'volumen_avance_actual_hectolitros']?.toString() || '0');
      if (volumenMeta || volumenAvance) {
        resultados.Volumen.meta += volumenMeta;
        resultados.Volumen.avance += volumenAvance;
        resultados.Volumen.count++;
        resultados.color = '#385cad';
      }

      // Volumen Retornable
      const vrMeta = parseFloat(data[isCartones ? 'volumen_retornable_meta_mes_cartones' : 'volumen_retornable_meta_mes_hectolitros']?.toString() || '0');
      const vrAvance = parseFloat(data[isCartones ? 'volumen_retornable_avance_actual_cartones' : 'volumen_retornable_avance_actual_hectolitros']?.toString() || '0');
      if (vrMeta || vrAvance) {
        resultados.VolumenRetornable.meta += vrMeta;
        resultados.VolumenRetornable.avance += vrAvance;
        resultados.VolumenRetornable.count++;
        resultados.color = '#65baaf';
      }

      // Above Core + Beyond Beer
      const aboveCoreAvance = parseFloat(data[isCartones ? 'above_core_avance_actual_cartones' : 'above_core_avance_actual_hectolitros']?.toString() || '0');
      const beyondBeerAvance = parseFloat(data[isCartones ? 'beyond_beer_avance_actual_cartones' : 'beyond_beer_avance_actual_hectolitros']?.toString() || '0');
      const beyondBeerMeta = parseFloat(data[isCartones ? 'beyond_beer_meta_mes_cartones' : 'beyond_beer_meta_mes_hectolitros']?.toString() || '0');
      if (aboveCoreAvance || beyondBeerAvance || beyondBeerMeta) {
        resultados.AboveCoreBeyondBeer.avance += aboveCoreAvance + beyondBeerAvance;
        resultados.AboveCoreBeyondBeer.meta += beyondBeerMeta;
        resultados.AboveCoreBeyondBeer.count++;
        resultados.color = '#ef5e5e';
      }

      // Marketplace
      const mpMeta = parseFloat(data['marketplace_meta']?.toString() || '0');
      const mpAvance = parseFloat(data['marketplace_avance']?.toString() || '0');
      if (mpMeta || mpAvance) {
        resultados.Marketplace.meta += mpMeta;
        resultados.Marketplace.avance += mpAvance;
        resultados.Marketplace.count++;
        resultados.color = '#f19613';
      }
    }

    console.log('Resultados calculados:', resultados);

    const format = (nombre: string, meta: number, avance: number, count: number, color: string): Kpi => {
      const metaProm = meta / count || 0;
      const avanceProm = avance / count || 0;
      const porcentaje = metaProm > 0 ? parseFloat(((avanceProm / metaProm) * 100).toFixed(2)) : 0;
      const colorHex = color || 'rgba(33, 150, 243, 0.8)';
      return { nombre, tipo, meta: metaProm, avance: avanceProm, porcentaje, color: colorHex };
    };

    const kpis = [
      format('Volumen', resultados.Volumen.meta, resultados.Volumen.avance, resultados.Volumen.count, resultados.color),
      format('Volumen Retornable', resultados.VolumenRetornable.meta, resultados.VolumenRetornable.avance, resultados.VolumenRetornable.count, resultados.color),
      format('Above Core + Beyond Beer', resultados.AboveCoreBeyondBeer.meta, resultados.AboveCoreBeyondBeer.avance, resultados.AboveCoreBeyondBeer.count, resultados.color),
      format('Marketplace', resultados.Marketplace.meta, resultados.Marketplace.avance, resultados.Marketplace.count, resultados.color),
    ];

    console.log('KPIs finales generados:', kpis);
    return kpis;
  }
}
